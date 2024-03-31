import styles from './page.module.css'

const flightData = [
    {
        date: "2024-02-21",
        site: "Mount Caburn",
        flightTime: "1:30",
        distance: 5.6,
    },
    {
        date: "2024-02-20",
        site: "Mount Caburn",
        flightTime: "0:12",
        distance: 1.7,
    },
    {
        date: "2024-02-20",
        site: "Mount Caburn",
        flightTime: "0:40",
        distance: 2.0,
    },
]

const progressMetrics = [
    {
        value: "35",
        label: "Flights",
        change: "7",
        changeType: "increase",
        cumulative: true
    },
    {
        value: "12:10",
        label: "Total Airtime",
        change: "2:10",
        changeType: "increase",
        cumulative: true
    },
    {
        value: "5",
        label: "Sites Flown",
        change: "2",
        changeType: "increase",
        cumulative: true
    },
    {
        value: "1:05",
        label: "Longest Flight",
        change: "0",
        changeType: "unchanged",
        cumulative: false
    },
    {
        value: "20",
        label: "Thermals Climbed",
        change: "8",
        changeType: "increase",
        cumulative: true
    },
    {
        value: "10.3K",
        label: "Furthest Flight",
        change: "5.6K",
        changeType: "increase",
        cumulative: false
    },
]

export default function Home() {
    return (
        <div className="flex flex-col">
            <section id="top-section" className="grid grid-cols-[1fr_240px] gap-8">
                <section id="progress" className="flex flex-col">
                    <div className="flex flex-row justify-between">
                        <h2 className="pl-[8px]">Your Progress</h2>
                        <div>
                            <select>
                                <option>Today</option>
                                <option>Last week</option>
                                <option>Last month</option>
                                <option>Year to date</option>
                                <option>Last year</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.progressCards}>
                        {progressMetrics.map((metric, i) => (
                            <div key={i} className={styles.progressCard}>
                                <p className={styles.progressNumber}>{metric.value}</p>
                                <p className={styles.progressMetric}>{metric.label}</p>
                                <p className={styles.progressChange}>{metric.changeType === 'increase' ? '↑' + metric.change : '-'} {metric.cumulative ? 'in' : 'from'} {' the last month'}</p>
                                <p></p>
                            </div>
                        ))}
                    </div>
                </section>
                <section id="upload" className="w-[240px]">
                    <button className={styles.uploadButton}>Upload Flight</button>
                </section>
            </section>
            <section id="bottom-section" className="mt-4">
                <h2 className="pl-[8px]">Latest Flights</h2>
                <table className="w-full">
                    <thead>
                        <tr className="grid grid-cols-[12ch_1fr_12ch_12ch]">
                            <th className={styles.tableCell}>Date</th>
                            <th className={styles.tableCell}>Site</th>
                            <th className={styles.tableCell}>Flight Time</th>
                            <th className={styles.tableCell}>Distance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flightData.map((flight, i) => (
                            <tr key={i} className="grid grid-cols-[12ch_1fr_12ch_12ch]">
                                <td className={styles.tableCell}>{flight.date}</td>
                                <td className={styles.tableCell}>{flight.site}</td>
                                <td className={styles.tableCell}>{flight.flightTime}</td>
                                <td className={styles.tableCell}>{flight.distance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    )
}