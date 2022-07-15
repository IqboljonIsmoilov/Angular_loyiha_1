import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskDTO} from "./dto/taskDTO";
import {AppService} from "./app.service";

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'app-hello';
  public userName: string;
  public currentTask: TaskDTO;
  public deleteTask: TaskDTO;
  // public taskList: TaskDTO[];
  public taskList: Array<TaskDTO>;
  public generalIndex = 7;
  public deleteMessage = '';

  constructor(private appService: AppService) {
    this.userName = '';
    this.currentTask = new TaskDTO();
    this.taskList = [];
    // @ts-ignore
    this.deleteTask = null;
  }

  ngOnInit(): void {
    this.initData();
  }


  public initData(): void {
    this.appService.getTaskJson().subscribe(value => {
      this.taskList = value;
    });
  }

  public print() {
    // @ts-ignore
    // console.log(document.getElementById("user-name").value)
    console.log(this.userName);
    // console.log(document.getElementById("user-name").innerText);
  }

  public inputChanged() {
    // @ts-ignore
    const val = document.getElementById("surname").value;
    // @ts-ignore
    document.getElementById("surname-output").innerText = val;
    console.log(val);
  }

  public createTask() {

    if (this.currentTask.title.length < 2 || this.currentTask.content.length < 2) {
      alert("Mazgi fill all the inputs")
      return;
    }

    this.currentTask.id = this.generalIndex;
    this.generalIndex++;
    this.taskList.push(this.currentTask);
    this.currentTask = new TaskDTO();

    console.log(this.taskList);
  }

  delete(task: TaskDTO) {
    /*    let indexFound = -1;
        this.taskList.forEach((value, index) => {
          if (value.title === title) {
            indexFound = index;
          }
        });
        this.taskList.splice(indexFound, 1);*/
    this.deleteMessage = 'Are you want delete: ' + task.title + '?';
    this.deleteTask = task;
    this.showModal();

  }

  deleteConfirm() {
    if (this.deleteTask) {
      let indexFound = this.taskList.findIndex((value, index) => {
        return value.id === this.deleteTask.id;
      });
      this.taskList.splice(indexFound, 1);
    }
    this.closeModal();
  }


  update(task: TaskDTO) {
    this.currentTask.id = task.id;
    this.currentTask.title = task.title;
    this.currentTask.content = task.content;
  }

  updateTask() {
    let indexFound = this.taskList.findIndex((value, index) => {
      return value.id === this.currentTask.id;
    });

    this.taskList[indexFound].title = this.currentTask.title;
    this.taskList[indexFound].content = this.currentTask.content;
    this.currentTask = new TaskDTO();
  }

  cancel() {
    this.currentTask = new TaskDTO();
  }

  public showModal() {
    $('#myModal').modal('show');
  }

  public closeModal() {
    $('#myModal').modal('hide');
  }
}

