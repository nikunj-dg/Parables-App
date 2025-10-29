import { useState } from "react";

interface Parable {
    id: number;
    title: string;
    content: string;
    author?: string;
    tags?: string;
}

interface FormData {
    onSubmit: (data: Parable) => void;
    formTitle: string;
    parable: Parable;
}

const ParableForm = ({ onSubmit, formTitle, parable }: FormData) => {
    const [title, setTitle] = useState(parable.title);
    const [author, setAuthor] = useState(parable?.author || "");
    const [content, setContent] = useState(parable.content);
    const [tags, setTags] = useState(parable?.tags || "");
    const id = parable.id;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // const formattedTags = tags
        // .split(",")
        // .map((t) => t.trim())
        // .filter((t) => t.length > 0);

        onSubmit({
            id,
            title,
            author,
            content,
            tags,
            // tags: formattedTags,
        });

        // Clear fields after submission
        setTitle("");
        setAuthor("");
        setContent("");
        setTags("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
            <div className="text-xl font-bold text-gray-800 mb-4 text-center">
                {formTitle}
            </div>

            <div className="text-base p-3">
                <label htmlFor="title">
                    Title
                </label>
                <div className="mb-3 mt-2">
                    <input id="title" name="title" className="bg-gray-100 rounded-md w-80 p-3" type="text" value={title} 
                    onChange={(e) => setTitle(e.target.value)}></input>
                </div>
                <label htmlFor="author">
                    Author
                </label>
                <div className="mb-3 mt-2">
                    <input id="author" name="author"  className="bg-gray-100 rounded-md w-80 p-3" type="text" value={author} 
                    onChange={(e) => setAuthor(e.target.value)}></input>
                </div>
                <label htmlFor="content">
                    Content
                </label>
                <div className="mb-3 mt-2">
                    <textarea id="content" name="content" className="bg-gray-100 rounded-md w-xl h-48 p-3" value={content} 
                    onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <label htmlFor="tags">
                    Tags
                </label>
                <div className="mb-3 mt-2">
                    <input id="tags" name="tags" className="bg-gray-100 rounded-md w-80 p-3" type="text" value={tags} 
                    onChange={(e) => setTags(e.target.value)}></input>
                </div>

                <button className="bg-gray-100 rounded-md shadow-md hover:shadow-xl transition duration-200 p-3 mt-3 text-md">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default ParableForm;