export default abstract class ValueObjectFactory<O, P> {
  public abstract create(props: P): O;
}
