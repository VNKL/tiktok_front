import React, { PureComponent } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend} from 'recharts';


export default class DiagramView extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width='90%' height='70%' >
                <LineChart
                    width={500}
                    height={300}
                    data={this.props.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date"/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line name='Количество видео' type="monotone" dataKey="videos_count" stroke="#e91e63" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
