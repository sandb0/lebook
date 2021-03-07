export default abstract class AbstractRule {
  public abstract hasError(): boolean;
  public abstract getError(): Error;
}
