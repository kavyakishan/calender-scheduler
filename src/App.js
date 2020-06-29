import React, {useRef} from 'react';
import './App.css';
import { Day, Week, Month, Agenda, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';

const App = () => {
  const data = extend([], localStorage.getItem('data') === undefined ? [] : JSON.parse(localStorage.getItem('data')), null, true);
  const scheduleObj = useRef();
  const resourceData = [
      { text: 'Kavya', id: 1, color: '#1aaa55' },
      { text: 'Vivek', id: 2, color: '#7fa900' },
      { text: 'Deepika', id: 3, color: '#87ceeb' },
  ];

const onActionComplete = (args) => {
  localStorage.setItem('data',JSON.stringify(scheduleObj.current.dataModule.dataManager.dataSource.json));
}

return (
<div className='schedule-control-section'>
  <div className='col-lg-12 control-section'>
    <div className='control-wrapper'>
      <ScheduleComponent 
      width='100%' 
      height='650px' 
      eventSettings={{
        dataSource: data, 
        fields: {
            subject: { title: 'Task', name: 'Subject' },
            location: { title: 'Project Name', name: 'Location' },
            description: { title: 'Comments', name: 'Description' }
        }
      }}
      ref={(ref) => {
        scheduleObj.current = ref;
      }}
      actionComplete={onActionComplete} 
      group={{ byDate: true, resources: ['Owners'] }}>
        <ResourcesDirective>
          <ResourceDirective 
            field='TaskId' 
            title='Assignee' 
            name='Owners' 
            allowMultiple={true} 
            dataSource={resourceData} 
            textField='text' 
            idField='id'
            colorField='color'>
          </ResourceDirective>
        </ResourcesDirective>
        <ViewsDirective>
          <ViewDirective option='Day'/>
          <ViewDirective option='Week'/>
          <ViewDirective option='Month'/>
          <ViewDirective option='Agenda'/>
        </ViewsDirective>
        <Inject services={[Day, Week, Month, Agenda, Resize, DragAndDrop]}/>
      </ScheduleComponent>
    </div>
  </div>
</div>);
}

export default App;
