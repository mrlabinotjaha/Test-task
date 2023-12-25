import React, { useState, useEffect } from 'react';
import ProgressBar from '../ProgressBar';
import Accordion from '../Accordion';
import { getTasks } from '../../services/tasks';

interface Task {
  description: string;
  value: number;
  id: string;
  checked: boolean;
}

interface TaskGroup {
  name: string;
  allChecked: boolean;
  tasks: Task[];
}

const GroupedTasks: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [data, setData] = useState<TaskGroup[]>([]);

  function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const tasks = await getTasks();

        let totalProgress = 0;
        let totalMaxValue = 0;
        const processedData = tasks.map((group: TaskGroup) => {
          let groupMaxValue = 0;
          let allChecked = true;

          const tasksWithId = group.tasks.map((task: Task) => ({
            ...task,
            id: generateRandomId(), // Assign a random ID
          }));

          tasksWithId.forEach((task: Task) => {
            groupMaxValue += task.value;
            if (task.checked) {
              totalProgress += task.value;
            } else {
              allChecked = false;
            }
          });

          totalMaxValue += groupMaxValue;

          return {
            ...group,
            tasks: tasksWithId,
            allChecked: allChecked,
          };
        });

        setData(processedData);
        setProgress(totalProgress);
        setMaxValue(totalMaxValue);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchData();
  }, []);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    let newProgress = 0;

    const updatedData = data.map((group) => {
      const updatedTasks = group.tasks.map((task) => {
        const isChecked = task.id === id ? e.target.checked : task.checked;
        if (isChecked) {
          newProgress += task.value;
        }

        return {
          ...task,
          checked: isChecked,
        };
      });

      return {
        ...group,
        tasks: updatedTasks,
        allChecked: updatedTasks.every((task) => task.checked),
      };
    });

    setData(updatedData);
    setProgress(newProgress);
  };

  return (
    <div className="grouped-tasks">
      <div className="grouped-tasks__header">
        <h3>Lodgify Grouoped Tasks</h3>
        <ProgressBar value={progress} maxValue={maxValue} />
      </div>

      <div className="flex f-d-column border radius-1">
        {data?.map((group, index) => {
          return (
            <Accordion
              handleOnChange={handleCheckboxChange}
              title={group.name}
              items={group.tasks}
              key={index}
              allChecked={group.allChecked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GroupedTasks;
