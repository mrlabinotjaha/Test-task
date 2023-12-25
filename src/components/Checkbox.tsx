import React from 'react';

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  isChecked,
  handleOnChange,
}) => {
  return (
    <div className="p-1">
      <label className="container">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleOnChange(e)}
        />
        <p className="m-0">{label}</p>
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default Checkbox;
