import React from 'react'

export default function TableBody({ tableBody }) {
    return (
        <tbody>
            {tableBody.map((item, a) => {
                return (
                    <tr key={a}>
                        {Object.values(item).map((ceil, b) => {
                            return (
                                <td key={b}>
                                    {ceil}
                                </td>
                            )
                        })
                        }
                    </tr>
                )
            })
            }
        </tbody>
    )
}