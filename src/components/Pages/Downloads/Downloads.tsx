import React from 'react';
import PaperCatBlue from '../../../static/downloads/BlueCat2.pdf';
import PaperCatWhite from '../../../static/downloads/WhiteCat2.pdf';

const downloads = [
    {
        name: "Print, Cut and Make Paper Cat - Blue",
        date: "21st of Dec, 2021",
        creator: "PaperCraftCats",
        download_link: PaperCatBlue,
    },
    {
        name: "Print, Cut and Make Paper Cat - White",
        date: "21st of Dec, 2021",
        creator: "PaperCraftCats",
        download_link: PaperCatWhite,
    }
]

export default function Downloads() {
    return (
        <section className="default-page default-page-downloads">
            <div className="inner-container">
                <h1 style={{marginTop: '0px', paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px'}}>Downloads</h1>
                <p style={{marginTop: '0px', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px'}}>Feel free to download and use these for non commercial reasons and do no re-distribute without prior authorisation.</p>
                <div className="downloads-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date Added</th>
                                <th>Creator</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {downloads.map(download => {
                                return <tr>
                                    <td>
                                        {download.name}
                                    </td>
                                    <td>
                                        {download.date}
                                    </td>
                                    <td>
                                        {download.creator}
                                    </td>
                                    <td>
                                        <a target="_blank" href={download.download_link}>Download</a>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
