
const Pagination = ({ pageSize, totalData, clickHandler }) => {
    const pages = Math.ceil(totalData / pageSize);
    let array = [];
    for (let i = 1; i <= pages; i++) {
        array.push(i);
    }

    return (
        <div className="pagination">
            <div onClick={() => clickHandler(1)}>First</div>
            <div className="pagination-nums">
                {
                    pageSize > 0 ? array.map((ele, index) => {
                        return <div key={index} onClick={()=>clickHandler(ele)}>{ele}</div>
                    }) : ''
                }
            </div>
            <div onClick={() => clickHandler(pages)}>Last</div>
        </div>
    )
}

export default Pagination;