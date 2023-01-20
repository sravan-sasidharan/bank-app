import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() item:string|undefined
  // @input()- To hold data from the dashboard(parent)
  // property binding [item]="acno" -> dashboard.html
@Output() onCancel=new EventEmitter
// create a user defined event - onCancel()
@Output() onDelete=new EventEmitter
  constructor() { }

  ngOnInit(): void {
  }
cancel(){
  this.onCancel.emit()
}

delete(){
  this.onDelete.emit(this.item);

}

}
