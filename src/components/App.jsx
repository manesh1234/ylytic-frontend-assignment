import React, { useState, useEffect } from "react";
import { API, filterData } from "../utils/constants";
import { Dna } from "react-loader-spinner";
import { RxCross1 } from "react-icons/rx";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import Pagination from "./Pagination";

const App = () => {
    const [allComments, setAllComments] = useState(null);
    const [filteredComments, setFilteredComments] = useState(null);
    const [localFiltered, setLocalFiltered] = useState(null);
    const [text, setText] = useState("");
    const [dropdownValue, setDropdownValue] = useState("25");
    const [pageIndex, setPageIndex] = useState(1);
    const [con, setCon] = useState("");
    const [col, setCol] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(API);
        const json = await data.json();
        setAllComments(json?.comments);
        setFilteredComments(json?.comments);
        setLocalFiltered(
            json?.comments?.slice(
                dropdownValue * pageIndex - dropdownValue,
                dropdownValue * pageIndex
            )
        );
    };

    const onClickHandler = (pageChange) => {
        setPageIndex(pageChange);
        setLocalFiltered(
            filteredComments.slice(
                dropdownValue * pageChange - dropdownValue,
                dropdownValue * pageChange
            )
        );
    };

    const sortHandler = (condition, colName) => {
        setCol(colName);
        if (colName === col)
            setCon(condition === "asc" ? "des" : "asc");
        else
            setCon(condition);
        condition === "asc"
            ? setLocalFiltered(
                filteredComments.sort((a, b) => {
                    if (colName === "at") {
                        return new Date(a[colName]) - new Date(b[colName]);
                    } else if (colName === "author" || colName === "text") {
                        return a[colName] > b[colName];
                    }
                    return a[colName] - b[colName];
                })
            )
            : setLocalFiltered(
                filteredComments.sort((a, b) => {
                    if (colName === "at") {
                        return new Date(b[colName]) - new Date(a[colName]);
                    } else if (colName === "author" || colName === "text") {
                        return b[colName] > a[colName];
                    }
                    return b[colName] - a[colName];
                })
            );
    };

    return (
        <div className="app">
            <h1 className="title">Ylytic FrontEnd assignment</h1>
            <p>
                <a href={API} target="_blank" rel="noreferrer">
                    source
                </a>
            </p>
            <div className="title-row">
                <div className="title-row-input">
                    <input type="text" placeholder="Filter" value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            if (e.target.value === "") {
                                setFilteredComments(allComments);
                                setLocalFiltered(
                                    allComments.slice(
                                        dropdownValue * pageIndex - dropdownValue,
                                        dropdownValue * pageIndex
                                    )
                                );
                                return;
                            }
                            setFilteredComments(filterData(e.target.value, allComments));
                            setLocalFiltered(
                                filterData(e.target.value, allComments).slice(dropdownValue * pageIndex - dropdownValue, dropdownValue * pageIndex)
                            );
                        }}
                    />
                    <RxCross1
                        className="title-row-input-unselect"
                        onClick={() => {
                            setText('');
                            setFilteredComments(allComments);
                            setLocalFiltered(
                                allComments.slice(
                                    dropdownValue * pageIndex - dropdownValue,
                                    dropdownValue * pageIndex
                                )
                            );
                        }}
                    />
                </div>
                <h5>{allComments ? allComments.length + " records" : ""}</h5>
                <select
                    name="dropdown"
                    id="dropdown"
                    value={dropdownValue}
                    onChange={(e) => {
                        setDropdownValue(e.target.value);
                        setLocalFiltered(
                            filteredComments.slice(
                                e.target.value * pageIndex - e.target.value,
                                e.target.value * pageIndex
                            )
                        );
                    }}
                >
                    <option value="25">25 per rows</option>
                    <option value="50">50 per rows</option>
                    <option value="100">100 per rows</option>
                </select>
            </div>
            { filteredComments && filteredComments.length>0 && <div className="pagination-div">
                        <Pagination
                            pageSize={dropdownValue}
                            totalData={!filteredComments ? 0 : filteredComments.length}
                            clickHandler={onClickHandler}
                        />
                </div>
            }
            <div className="table-div">
                {!allComments ? (
                    <h1 className="loading">
                        <Dna
                            visible={true}
                            height="500"
                            width="500"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </h1>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <div className="thead">
                                        At
                                        <div className="thead-arrows">
                                            {col === "at" ? (
                                                con === "asc" ? (
                                                    <MdArrowUpward
                                                        onClick={() => sortHandler("asc", "at")}
                                                    />
                                                ) : (
                                                    <MdArrowDownward
                                                        onClick={() => sortHandler("des", "at")}
                                                    />
                                                )
                                            ) : (
                                                <>
                                                    <MdArrowUpward
                                                        onClick={() => sortHandler("asc", "at")}
                                                    />
                                                    <MdArrowDownward
                                                        onClick={() => sortHandler("des", "at")}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="thead">
                                        Author
                                        <div className="thead-arrows">
                                            {col === "author" ? (
                                                con === "asc" ? (
                                                    <MdArrowUpward
                                                        onClick={() => sortHandler("asc", "author")}
                                                    />
                                                ) : (
                                                    <MdArrowDownward
                                                        onClick={() => sortHandler("des", "author")}
                                                    />
                                                )
                                            ) : (
                                                <>
                                                    <MdArrowUpward
                                                        onClick={() => sortHandler("asc", "author")}
                                                    />
                                                    <MdArrowDownward
                                                        onClick={() => sortHandler("des", "author")}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="thead">
                                        Like
                                        <div className="thead-arrows">
                                            {col === "like" ? (
                                                con === "asc" ? (
                                                    <MdArrowUpward
                                                        onClick={() => sortHandler("asc", "like")}
                                                    />
                                                ) : (
                                                    <MdArrowDownward
                                                        onClick={() => sortHandler("des", "like")}
                                                    />
                                                )
                                            ) : (
                                                <>
                                                    <MdArrowUpward
                                                        onClick={() => sortHandler("asc", "like")}
                                                    />
                                                    <MdArrowDownward
                                                        onClick={() => sortHandler("des", "like")}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="thead">
                                        Reply
                                        <div className="thead-arrows">
                                            {col === "reply" ? (
                                                con === "asc" ? (
                                                    <MdArrowUpward
                                                        onClick={() => sortHandler("asc", "reply")}
                                                    />
                                                ) : (
                                                    <MdArrowDownward
                                                        onClick={() => sortHandler("des", "reply")}
                                                    />
                                                )
                                            ) : (
                                                <>
                                                    <MdArrowUpward
                                                        onClick={() => sortHandler("asc", "reply")}
                                                    />
                                                    <MdArrowDownward
                                                        onClick={() => sortHandler("des", "reply")}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="thead">
                                        text
                                        <div className="thead-arrows">
                                            {col === "text" ? (
                                                con === "asc" ? (
                                                    <MdArrowUpward
                                                        onClick={() => sortHandler("asc", "text")}
                                                    />
                                                ) : (
                                                    <MdArrowDownward
                                                        onClick={() => sortHandler("des", "text")}
                                                    />
                                                )
                                            ) : (
                                                <>
                                                    <MdArrowUpward
                                                        onClick={() => sortHandler("asc", "text")}
                                                    />
                                                    <MdArrowDownward
                                                        onClick={() => sortHandler("des", "text")}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {localFiltered.length > 0 ? (
                                localFiltered.map((ele, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{ele.at}</td>
                                            <td>{ele.author}</td>
                                            <td>{ele.like}</td>
                                            <td>{ele.reply}</td>
                                            <td>{ele.text}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5">{`No results found for "${text}"`}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            { filteredComments && filteredComments.length>0 && <div className="pagination-div footer">
                        <Pagination
                            pageSize={dropdownValue}
                            totalData={!filteredComments ? 0 : filteredComments.length}
                            clickHandler={onClickHandler}
                        />
                </div>
            }
        </div>
    );
};

export default App;
