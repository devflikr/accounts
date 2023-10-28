import useFormContext from './Form/useFormContext';
import { FormErrors } from './Form/FormContext';
import { twMerge } from 'tailwind-merge';

export interface ErrorBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    name: keyof FormErrors;
}

function ErrorBox({name, className, ...props}: ErrorBoxProps) {
    const { errors } = useFormContext();

    return (errors[name] && <span className={twMerge("w-full block text-xs font-bold mt-1 text-red-600", className)} children={errors[name]} {...props} />);
}

export default ErrorBox;