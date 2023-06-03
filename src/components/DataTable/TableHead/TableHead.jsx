import React from 'react'

export default function TableHead({ tableHead }) {
    return (
        <thead>
            <tr>
                {
                    tableHead?.map((item, i) => {
                        return (
                            <th key={i}>
                                {item}
                            </th>
                        )
                    })
                }
            </tr>
        </thead>
    )
}