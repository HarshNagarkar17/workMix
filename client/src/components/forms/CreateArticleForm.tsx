import { FormProvider, useForm } from 'react-hook-form'
import RHFInput from '../RHFInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { articleSchema } from '@/schema/form/article';
import SubmitBtn from '../buttons/SubmitBtn';
import { createArticle } from '@/service/api/article';
import Editor from 'react-simple-wysiwyg';
import { useState } from 'react';

const CreateArticleForm = () => {

    const [html, setHtml] = useState('');
    const defaultValues = {
        title: "",
        description: "",
        content: ""
    }
  
  function onChange(e:any) {
    setHtml(e.target.value);
  }
    const methods = useForm({
        defaultValues,
        mode: "onBlur",
        resolver:zodResolver(articleSchema())
    });
    console.log({html})
    const { handleSubmit, watch, formState: { isSubmitting } } = methods;

    const handleFormSubmit = handleSubmit(async(data:any) => {
        try {
            const res = await createArticle(data);
            console.log({res})
        } catch (error:any) {
            console.log({error})
        }
    })
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleFormSubmit}>
               <RHFInput name='title' />
               <RHFInput name='description' />
               <RHFInput name='content' />
               <Editor value={html} onChange={onChange} />
               <SubmitBtn name='submit' />
            </form>
        </FormProvider>
    )
}

export default CreateArticleForm