export class TodoItem {
  constructor(
    public id: number,
    public task: string,
    public complete: boolean = false
  ) {
    //no statements required
  }

  printDetails(): void {
    console.log(
      `${this.id}. [${this.complete ? 'X' : ' '}]   ${this.task} ${
        this.complete ? '\t(complete)' : ''
      }`
    );
  }
}
