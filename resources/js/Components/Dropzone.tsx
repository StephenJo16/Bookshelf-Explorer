import React, { useEffect, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

type DropzoneProps = {
    onDrop: (acceptedFiles: File[]) => void;
    img?: string;
}

const Dropzone = ({ onDrop, img = '' }: DropzoneProps) => {
    const [files, setFiles] = useState<(File & {preview:string})[]>([]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            onDrop(acceptedFiles)
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    })


    return (
        <div
            {...getRootProps()}
            className={`h-[30rem] sm:h-96 w-full sm:w-72 border border-neutral-200 rounded-md flex items-center justify-center cursor-pointer ${(files.length > 0) || img !== '' ? "p-0" : "p-8"}`}
        >
            <input {...getInputProps()} />
            {files.length > 0 || (img !== '') ? (
                <img src={files.length > 0 ? URL.createObjectURL(files[0]) : img} alt="Uploaded book cover" className="w-full h-full rounded-md" />
            ) : isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p className="text-center">Drag and drop some files here, or click to select files</p>
                )
            }
        </div>
    );
};

export default Dropzone;
