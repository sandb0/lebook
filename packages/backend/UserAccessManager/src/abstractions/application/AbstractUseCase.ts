import AbstractRule from './AbstractRule';

export default abstract class AbstractUseCase<P> {
  public abstract execute(props: P): string;

  protected checkRule(rule: AbstractRule): void {
    if (rule.hasError()) {
      throw rule.getError();
    }
  }
}
