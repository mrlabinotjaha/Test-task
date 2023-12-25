import React, { useState } from 'react';
import Checkbox from './Checkbox';
import ArrowDown from '../assets/images/arrow-down.svg';
import ArrowUp from '../assets/images/arrow-up.svg';
import TaskIcon from '../assets/images/task.svg';

interface Task {
  description: string;
  value: number;
  id: string;
  checked: boolean;
}

interface AccordionProps {
  title: string;
  allChecked: boolean;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  items: Task[];
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  items,
  allChecked,
  handleOnChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="p-2 border-top">
        <div
          onClick={toggleAccordion}
          className="flex f-s-between cursor-pointer"
        >
          <div className="flex gap-1">
            <img src={TaskIcon} alt="Task" />
            <h4 className={`normal m-0 ${allChecked ? 'text-green' : ''}`}>
              {title}
            </h4>
          </div>
          <div className="flex f-a-center gap-1">
            <p className="m-0 text-gray">{isOpen ? 'Hide' : 'Show'}</p>
            <img src={isOpen ? ArrowUp : ArrowDown} alt="Arrow" />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="p-1">
          {items.map((item) => (
            <Checkbox
              label={item.description}
              isChecked={item.checked}
              key={item.description}
              handleOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChange(e, item.id)
              }
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Accordion;
