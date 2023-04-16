import React, { Children, cloneElement, useState } from "react";

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  const [formState, setFormState] = useState<{ [key: string]: string }>({});

  const handleChange = ({ id, value }: { id: string; value: string }) => {
    setFormState({ ...formState, [id]: value });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    // console.log(e.target.id)
  };

  return (
    <form onSubmit={onSubmit} onChange={handleFormChange}>
      {Children.map(children, (child: any) => {
        return cloneElement(child, {
          ...child.props,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange({ id: e.target.id, value: e.target.value }),
          value: formState[child.props.id] || "",
        });
      })}
    </form>
  );
};

export default Form;
