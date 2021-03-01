import sanitizeHtml from 'sanitize-html';


export const Article = ({title, author, body, category, logo, date, image}) => {
    return (
        <div className="mx-auto px-4 py-4 max-w-xl my-4">
            <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide" >
                <div className="md:flex-shrink-0">
                    <img loading='lazy' src={image} alt="article image" className="w-full h-64 rounded-lg rounded-b-none"/>
                    <div className="flex items-center justify-between py-1 px-3 bg-gray-400" >
                        <h6 className='bg-gray-800 text-xs text-white px-2 py-1 font-semibold rounded uppercase hover:bg-gray-700'>{category}</h6>
                    </div>
                </div>
                <div className="px-4 py-2 mt-2">
                    <h2 className="font-bold text-2xl text-gray-800 tracking-normal">{title}</h2>
                        <p className="text-sm text-gray-700 px-2 mr-1" dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }}/>
                        
                    <div className="author flex items-center -ml-3 my-3">
                        <div className="user-logo">
                            <img className="w-12 h-12 object-cover rounded-full mx-4  shadow" src={logo} alt="avatar"/>
                        </div>
                        <h2 className="text-sm tracking-tighter text-gray-900">
                            <a href="https://void.fr">{author}</a> <span className="ml-2 text-gray-600">{date}</span>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}