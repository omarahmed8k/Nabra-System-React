import React from 'react'
import TableHead from './TableHead/TableHead'
import TableBody from './TableBody/TableBody'
import NoData from './../NoData/NoData'
import "./DataTable.scss"

export default function DataTable({ tableBody = [{ "": "" }], tableHead = [""] }) {
    return (
        <div className="table-responsive">
            {tableBody.length > 0 ?
                <table>
                    <TableHead tableHead={tableHead} />
                    <TableBody tableBody={tableBody} />
                </table>
                :
                <NoData />
            }
        </div>
    )
}