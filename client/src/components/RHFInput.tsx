import { Controller, useFormContext } from "react-hook-form";

interface RHFInputProps{
  name:string;
  Style?:any;
  PlaceHolder?:string;
}
const RHFInput = ({name,Style,PlaceHolder}:RHFInputProps) => {
  const {control} = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({field:{value,onChange,onBlur}, fieldState:{error,isTouched}}) => (
        <div>
          <div className="mb-5 w-[450px]">
            {/* <label htmlFor="username-success" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Your name</label> */}
            <input type="text" value={value}
              onChange={(e) => {
                onChange(e.target.value)
                if(isTouched)
                    onBlur();
              }}
              onBlur={onBlur}
            id="username-success" className={`bg-${error ? "red" : "green"}-50 border border-${error ? "red" : "green"}-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 
                 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500`} placeholder={PlaceHolder || ""} />
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{
              error && String(error?.message)
            }</p>
          </div>
          {/* <div className="w-[450px]">
            <label htmlFor="username-error" className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">Your name</label>
            <input type="text" id="username-error" className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Bonnie Green" />
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p>
          </div> */}
        </div>

      )}
    >

    </Controller>

  )
}

export default RHFInput