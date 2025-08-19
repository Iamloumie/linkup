'use client';
// THIS FORM WILL HANDLE THE FILE UPLOADING

import { useCallback, Dispatch, SetStateAction } from 'react';
import { useDropzone } from '@uploadthing/react';
import { generateClientDropzoneAccept } from 'uploadthing/client';

import { Button } from '../ui/button';
import { convertFileToURl } from '@/lib/utils';

type FileUploaderProps = {
    onFieldChange: (url: string) => void;
    imageUrl: string;
    setFiles: Dispatch<SetStateAction<File[]>>;
}

export function FileUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        onFieldChange(convertFileToURl(acceptedFiles[0]));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: generateClientDropzoneAccept(['image/*']),
    });

    return (
        <div
            {...getRootProps()}
            className='flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50'
        >
            <input {...getInputProps()} className='cursor-pointer' />

            {imageUrl ? (
                <div className='flex h-full w-full flex-1 justify-center'>
                    <img
                        src={imageUrl}
                        alt='Uploaded image'
                        className='h-full w-full object-cover object-center'
                        width={250}
                        height={250}
                    />
                </div>
            ) : (
                <div className='flex-center flex-col py-5 text-grey-500'>
                    <img src="/assets/icons/file-upload.svg" alt="file upload icon" width={77} height={77} />
                    <h3 className="mb-2 mt-2">Drag photo here</h3>
                    <p className='p-medium-12 mb-4'>SVG, PNG, JPG</p>
                    <Button type="button" variant='secondary' className='rounded-full'>
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    );
}