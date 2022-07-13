export class TaskDTO{
  public title: String;
  public content: String;
  public status: boolean = false;


  constructor() {
    this.title = '';
    this.content = '';

  }
}
