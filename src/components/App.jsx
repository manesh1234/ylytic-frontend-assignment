import React, { useState, useEffect } from "react";
import { API, filterData, timeSortHandler, textSortHandler, numSortHandler } from "../utils/constants";
import { Dna } from "react-loader-spinner";
import { RxCross1 } from 'react-icons/rx';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import Pagination from "./Pagination";


const App = () => {
    const [allComments, setAllComments] = useState(null);
    const [filteredComments, setFilteredComments] = useState(null);
    const [localFiltered, setLocalFiltered] = useState(null);
    const [text, setText] = useState('');
    const [dropdownValue, setDropdownValue] = useState("25");
    const [pageIndex, setPageIndex] = useState(1);
    const [atSortAscending, setAtSortAscending] = useState(false);
    const [atSortDescending, setAtSortDescending] = useState(false);
    const [authorAscending, setAuthorAscending] = useState(false);
    const [authorDescending, setAuthorDescending] = useState(false);
    const [likeAscending, setLikeAscending] = useState(false);
    const [likeDescending, setLikeDescending] = useState(false);
    const [replyAscending, setReplyAscending] = useState(false);
    const [replyDescending, setReplyDescending] = useState(false);
    const [textAscending, setTextAscending] = useState(false);
    const [textDescending, setTextDescending] = useState(false);


    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const data = await fetch(API);
        const json = await data.json();
        setAllComments(json?.comments);
        setFilteredComments(json?.comments);
        setLocalFiltered(json?.comments?.slice(dropdownValue * pageIndex - dropdownValue, dropdownValue * pageIndex));
    }

    const onClickHandler = (pageChange) => {
        setPageIndex(pageChange);
        setLocalFiltered(filteredComments.slice(dropdownValue * pageChange - dropdownValue, dropdownValue * pageChange));
    }


    return (
        <>
            <h1 className="title">Ylytic FrontEnd assignment</h1>
            <p><a href={API} target="_blank" rel="noreferrer">source</a></p>
            <h5>{allComments ? allComments.length + ' records' : ''}</h5>
            <div className="title-row">
                <div className="title-row-input">
                    <input type="text" placeholder="Filter" value={text} onChange={e => {
                        setText(e.target.value);
                        if (e.target.value === '') {
                            setFilteredComments(allComments);
                            setLocalFiltered(allComments.slice(dropdownValue * pageIndex - dropdownValue, dropdownValue * pageIndex));
                            return;
                        }
                        setFilteredComments(filterData(e.target.value, allComments));
                        setLocalFiltered(filterData(e.target.value, allComments).slice(dropdownValue * pageIndex - dropdownValue, dropdownValue * pageIndex));
                    }} />
                    <RxCross1 className="title-row-input-unselect" onClick={() => {
                        setText('');
                        setFilteredComments(allComments);
                        setLocalFiltered(allComments.slice(dropdownValue * pageIndex - dropdownValue, dropdownValue * pageIndex));
                    }} />
                </div>
                <select name="dropdown" id="dropdown" value={dropdownValue} onChange={e => {
                    setDropdownValue(e.target.value);
                    setLocalFiltered(filteredComments.slice(e.target.value * pageIndex - e.target.value, e.target.value * pageIndex));
                }}>
                    <option value="25">25 per rows</option>
                    <option value="50">50 per rows</option>
                    <option value="100">100 per rows</option>
                </select>
            </div>
            <div className="pagination-div">
                {
                    filteredComments && filteredComments.length > 0 && <Pagination pageSize={dropdownValue} totalData={filteredComments.length} clickHandler={onClickHandler} />
                }
            </div>
            <div className="table-div">
                {
                    !allComments ? <h1 className="loading"><Dna
                        visible={true}
                        height="500"
                        width="500"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    /></h1> : (
                        <table>
                            <thead>
                                <tr>
                                    <td><div className="thead">
                                        At
                                        <div className="thead-arrows">
                                            {
                                                !atSortDescending ? <MdArrowUpward onClick={() => {
                                                    const data = timeSortHandler(filteredComments, "des");
                                                    setFilteredComments(data);
                                                    setLocalFiltered(data.slice(dropdownValue * pageIndex - dropdownValue, dropdownValue * pageIndex))
                                                    setAtSortDescending(true);
                                                    setAtSortAscending(false);
                                                }} /> : ''
                                            }
                                            {
                                                !atSortAscending ? <MdArrowDownward onClick={() => {
                                                    const data = timeSortHandler(filteredComments, "ascen");
                                                    setFilteredComments(data);
                                                    setLocalFiltered(data.slice(dropdownValue * pageIndex - dropdownValue, dropdownValue * pageIndex))
                                                    setAtSortAscending(true);
                                                    setAtSortDescending(false);
                                                }} /> : ''
                                            }
                                        </div>
                                    </div></td>
                                    <td><div className="thead">
                                        Author
                                        <div className="thead-arrows">
                                            {
                                                !authorDescending ? <MdArrowUpward onClick={() => {
                                                    const data = textSortHandler(filteredComments, "des", "author");
                                                    setFilteredComments(data);
                                                    setLocalFiltered(data.slice(dropdownValue * pageIndex - dropdownValue, dropdownValue * pageIndex))
                                                    setAuthorDescending(true);
                                                    setAuthorAscending(false);
                                                }} /> : ''
                                            }
                                            {
                                                !authorAscending ? <MdArrowDownward onClick={() => {
                                                    const data = textSortHandler(filteredComments, "ascen", "author");
                                                    setFilteredComments(data);
                                                    setLocalFiltered(data.slice(dropdownValue * pageIndex - dropdownValue, dropdownValue * pageIndex))
                                                    setAuthorAscending(true);
                                                    setAuthorDescending(false);
                                                }} /> : ''
                                            }
                                        </div>
                                    </div></td>
                                    <td><div className="thead">
                                        Like
                                        <div className="thead-arrows">
                                            {
                                                !likeDescending ? <MdArrowUpward onClick={() => {
                                                    const data = numSortHandler(filteredComments, "des", "like");
                                                    setFilteredComments(data);
                                                    setLocalFiltered(data.slice(dropdownValue * pageIndex - dropdownValue, dropdownValue * pageIndex))
                                                    setLikeDescending(true);
                                                    setLikeAscending(false);
                                                }} /> : ''
                                            }
                                            {
                                                !likeAscending ? <MdArrowDownward onClick={() => {
                                                    const data = numSortHandler(filteredComments, "ascen", "like");
                                                    setFilteredComments(data);
                                                    setLocalFiltered(data.slice(dropdownValue * pageIndex - dropdownValue, dropdownValue * pageIndex))
                                                    setLikeAscending(true);
                                                    setLikeDescending(false);
                                                }} /> : ''
                                            }
                                        </div>
                                    </div></td>
                                    <td><div className="thead">
                                        Reply
                                        <div className="thead-arrows">
                                            {
                                                !replyDescending ? <MdArrowUpward onClick={() => {
                                                    const data = numSortHandler(filteredComments, "des", "reply");
                                                    setFilteredComments(data);
                                                    setLocalFiltered(data.slice(dropdownValue * pageIndex - dropdownValue, dropdownValue * pageIndex))
                                                    setReplyDescending(true);
                                                    setReplyAscending(false);
                                                }} /> : ''
                                            }
                                            {
                                                !replyAscending ? <MdArrowDownward onClick={() => {
                                                    const data = numSortHandler(filteredComments, "ascen", "reply");
                                                    setFilteredComments(data);
                                                    setLocalFiltered(data.slice(dropdownValue * pageIndex - dropdownValue, dropdownValue * pageIndex))
                                                    setReplyAscending(true);
                                                    setReplyDescending(false);
                                                }} /> : ''
                                            }
                                        </div>
                                    </div></td>
                                    <td><div className="thead">
                                        text
                                        <div className="thead-arrows">
                                            {
                                                !textDescending ? <MdArrowUpward onClick={() => {
                                                    const data = textSortHandler(filteredComments, "des", "text");
                                                    setFilteredComments(data);
                                                    setLocalFiltered(data.slice(dropdownValue * pageIndex - dropdownValue, dropdownValue * pageIndex))
                                                    setTextDescending(true);
                                                    setTextAscending(false);
                                                }} /> : ''
                                            }
                                            {
                                                !textAscending ? <MdArrowDownward onClick={() => {
                                                    const data = textSortHandler(filteredComments, "ascen", "text");
                                                    setFilteredComments(data);
                                                    setLocalFiltered(data.slice(dropdownValue * pageIndex - dropdownValue, dropdownValue * pageIndex))
                                                    setTextAscending(true);
                                                    setTextDescending(false);
                                                }} /> : ''
                                            }
                                        </div>
                                    </div></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (localFiltered.length > 0) ?
                                        localFiltered.map((ele, index) => {
                                            return <tr key={index}>
                                                <td>{ele.at}</td>
                                                <td>{ele.author}</td>
                                                <td>{ele.like}</td>
                                                <td>{ele.reply}</td>
                                                <td>{ele.text}</td>
                                            </tr>
                                        }) : <tr><td colSpan='5'>{`No results found for "${text}"`}</td></tr>
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
            <div className="pagination-div footer">
                {
                    filteredComments && filteredComments.length > 0 && <Pagination pageSize={dropdownValue} totalData={filteredComments.length} clickHandler={onClickHandler} />
                }
            </div>
        </>
    );
};

export default App;

