import { Controller, useFormContext } from "react-hook-form"

interface RHFImageSelectorProps{
    name:string;
}
const RHFImageSelector = ({name}:RHFImageSelectorProps) => {
    const {control} = useFormContext();
  return (
    <Controller
        control={control}
        name={name}
        render={({field:{value,onChange}}) => (
            <div className='hidden'>
            <input type="file" accept='image/*' onChange={(e) => {
                            const file = e?.target?.files && e.target.files[0];
                            file && onChange(file);
                        }} name={name} id={name} />
        </div>
        )}
    >

    </Controller>
  )
}

export default RHFImageSelector