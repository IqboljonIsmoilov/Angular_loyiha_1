import { Component } from '@angular/core';
import {publishFacade} from "@angular/compiler";
import {TaskDTO} from "./dto/taskDTO";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'my_project_1';
  public userName: string;
 // public userSurName: string;
  public curentTask: TaskDTO;
  public taskList: TaskDTO[];
 // public taskList: Array<TaskDTO>;


  constructor() {
    this.userName = '';
   // this.userSurName = '';
    this.curentTask = new TaskDTO();
    this.taskList = [];
  }

  public print(){
    // @ts-ignore
/*
    console.log(document.getElementById('user_name').value)
*/
    console.log(this.userName)
  //  console.log(this.userSurName)
  }

  public createTask(){
    const temp = new TaskDTO();
    temp.title = this.curentTask.title;
    temp.content = this.curentTask.content;
    temp.status = this.curentTask.status;

    this.taskList.push(this.curentTask);
    this.curentTask = new TaskDTO();

    console.log(this.taskList);
  }

  delete(title: string) {
    /*    let indexFound = -1;
        this.taskList.forEach((value, index) => {
          if (value.title === title) {
            indexFound = index;
          }
        });
        this.taskList.splice(indexFound, 1);*/

    let indexFound =   this.taskList.findIndex((value, index) => {
      return value.title === title;
    })
    this.taskList.splice(indexFound, 1);
  }

}
