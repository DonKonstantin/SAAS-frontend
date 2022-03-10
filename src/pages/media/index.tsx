import React, {useState} from 'react';
import {NextPage} from "next";
import {PageWithMetaTags} from "../../components/UILayer/PageWithMetaTags";
import {PageWithChangeableMenu} from "../../layouts/MenuChangeLayout";

// Свойства страницы
type Props = PageWithMetaTags & PageWithChangeableMenu

// Компонент страницы проекта
const Page: NextPage<Props> = () => {
    const [selectedFile, setSelectedFile] = useState<any>();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmission = () => {
    };

    return(
        <div>
            <input type="file" name="file" onChange={changeHandler} />
            {isFilePicked ? (
                <div>
                    <p>Filename: {selectedFile.name}</p>
                    <p>Filetype: {selectedFile.type}</p>
                    <p>Size in bytes: {selectedFile.size}</p>
                    <p>
                        lastModifiedDate:{' '}
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>
    )
}

// Экспортируем основные параметры страницы
Page.getInitialProps = async () => ({
    title: "Медиабиблиотека",
    header: "Медиабиблиотека",
})

// Экспортируем компонент
export default Page
