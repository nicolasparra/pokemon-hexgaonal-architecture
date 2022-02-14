export type CircuitBreakerOptions = {
  openBreakerTimeoutInMs?: number;
  closedBreakerTimeoutInMs?: number;
  minFailedRequestThreshold?: number;
  percentageFailedRequestsThreshold?: number;
};

enum CircuitBreakerState {
  OPENED = "OPENED",
  CLOSED = "CLOSED",
  HALF = "HALF",
}

export class CircuitBreaker {
  options: Required<CircuitBreakerOptions>;
  state = CircuitBreakerState.OPENED;

  finishHalfStateAt: number | undefined = undefined;
  tryTriggerFromCloseAt: number | undefined = undefined;

  failCount = 0;
  successCount = 0;
  flag = 0;

  constructor(opts?: CircuitBreakerOptions) {
    this.options = {
      openBreakerTimeoutInMs: opts?.openBreakerTimeoutInMs || 10000,
      closedBreakerTimeoutInMs: opts?.closedBreakerTimeoutInMs || 5000,
      minFailedRequestThreshold: opts?.minFailedRequestThreshold || 5,
      percentageFailedRequestsThreshold:
        opts?.percentageFailedRequestsThreshold || 50,
    };
  }

  private resetStatistic() {
    this.successCount = 0;
    this.failCount = 0;
    this.flag = 0;
    this.finishHalfStateAt = undefined;
  }

  public get _successCount() {
    return this.successCount;
  }

  public get _failCount() {
    return this.failCount;
  }

  public get _finishHalfStateAt() {
    return this.finishHalfStateAt;
  }

  public get _state() {
    return this.state;
  }

  public set _state(value: String) {
    if (value == "CLOSED") this.state = CircuitBreakerState.CLOSED;
    if (value == "OPENED") this.state = CircuitBreakerState.OPENED;
    if (value == "HALF") this.state = CircuitBreakerState.HALF;
  }

  public get _tryTriggerFromCloseAt() {
    return this.tryTriggerFromCloseAt;
  }

  async fire(stateRequest: boolean) {
    if (stateRequest) {
      this.success();
    } else {
      this.fail();
    }
  }

  private success() {
    this.flag++;
    // handle successful requests
    if (this.state === CircuitBreakerState.HALF) {
      this.successCount++;
      // the previous tracking window closed and
      // nothing happened to close breaker
      if (Date.now() >= this.finishHalfStateAt!) {
        this.state = CircuitBreakerState.OPENED;
        this.resetStatistic();
      }
    }
    // attempt after closedBreakerTimeoutInMs successful
    // it means that we should open breaker
    //Si está cerrado y el tiempo de permanecer cerrado pasó, pasar a half
    //Como se mete siempre el flag count 0 1 2
    if (
      this.state === CircuitBreakerState.CLOSED &&
      Date.now() > this.tryTriggerFromCloseAt! &&
      this.flag == 2
    ) {
      this.state = CircuitBreakerState.HALF;
      // this.resetStatistic();
    }
    return;
  }

  private fail() {
    if (this.successCount > 0) this.successCount--;
    if (this.flag > 0) this.flag--;
    // handle failed requests
    // breaker closed and new attempt is failed
    //Si está cerra y hay un error se le suma más tiempo
    if (this.state === CircuitBreakerState.CLOSED) {
      this.tryTriggerFromCloseAt =
        Date.now() + this.options.closedBreakerTimeoutInMs;
      return;
    }

    // the first failed request comes in
    //Si está abierto y falla se pone en estado Half
    if (this.state === CircuitBreakerState.OPENED) {
      this.failCount++;
      this.state = CircuitBreakerState.HALF;
      this.finishHalfStateAt = Date.now() + this.options.openBreakerTimeoutInMs;
      return;
    }

    if (this.state === CircuitBreakerState.HALF) {
      this.failCount++;

      // it means that the previous tracking window closed
      // and nothing happened to close breaker
      // but the new HALF state should be started immediately
      if (Date.now() > this.finishHalfStateAt!) {
        // this.resetStatistic();
        this.failCount++;
        this.finishHalfStateAt =
          Date.now() + this.options.openBreakerTimeoutInMs;
        return;
      }

      // the tracking window isn't closed yet
      if (this.failCount >= this.options.minFailedRequestThreshold) {
        const failRate =
          (this.failCount * 100) / (this.failCount + this.successCount);

        // failed rate exceeds and breaker is closed
        if (failRate >= this.options.percentageFailedRequestsThreshold) {
          this.state = CircuitBreakerState.CLOSED;
          // this.resetStatistic();
          this.tryTriggerFromCloseAt =
            Date.now() + this.options.closedBreakerTimeoutInMs;
          return;
        }

        // otherwise it's considered as normal state
        // but the new tracking window should be started
        // this.resetStatistic();
        this.failCount++;
        this.finishHalfStateAt =
          Date.now() + this.options.openBreakerTimeoutInMs;
        return;
      }
    }
  }
}
