import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Avatar from "@material-ui/core/Avatar";
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import {dateStrFromParam, spacedNumber} from "../../../services/api-service";
import {useStyles, EnhancedTableHead, FilterToolbar} from "../table-functions";
import TablePagination from "@material-ui/core/TablePagination";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";


const headCells = [
    { id: 'is_liked', align: 'left', label: '', tooltip: 'Добавлен в избранное или нет' },
    { id: 'cover', align: 'left', label: '', tooltip: 'Обложка звука' },
    { id: 'artist', align: 'left', label: 'Автор', tooltip: 'Автор звука' },
    { id: 'title', align: 'left', label: 'Название', tooltip: 'Название звука' },
    { id: 'original', align: 'right', label: 'Оригинальный', tooltip: 'Оригинальный звук' },
    { id: 'play', align: 'right', label: 'Воспроизвести', tooltip: 'Воспроизвести звук' },
    { id: 'duration', align: 'right', label: 'Продолжительность', tooltip: 'Продолжительность звука' },
    { id: 'videos_count', align: 'right',  label: 'Кол-во видео', tooltip: 'Количество видео, снятых на звук' },
    { id: 'add_date', align: 'right',  label: 'Дата', tooltip: 'Дата добавления звука в базу данных сервиса' },
]


function playButton(playUrl) {
    return (
        <Tooltip title='Воспроизвести звук'>
            <TableCell align="right" onClick={() => {window.open(playUrl)}}>
                <PlayCircleFilledIcon color='secondary' style={{cursor: 'pointer'}}/>
            </TableCell>
        </Tooltip>
    )
}


const isOriginalIcons = [

    <Tooltip title='Неоригинальный звук' >
        <TableCell align="right" >
            <CancelIcon color='disabled' />
        </TableCell>
    </Tooltip>,

    <Tooltip title='Оригинальный звук' >
        <TableCell align="right" >
            <CheckCircleIcon color='secondary' />
        </TableCell>
    </Tooltip>,

]


const likeIcon = (isLiked, audioId, onLike, rows, setRows) => {
    const tooltipTitle = isLikedTooltips[isLiked]
    const icon = isLikedIcons[isLiked]
    return (
        <Tooltip title={tooltipTitle}>
            <TableCell align="left" onClick={() => {
                setRows(rows.map((row) => {
                    if (row.audioId === audioId) {
                        row.is_liked = row.is_liked ? 0 : 1
                        return row
                    } else {
                        return row
                    }
                }))
                onLike(audioId)
            }}>
                {icon}
            </TableCell>
        </Tooltip>
    )
}


const isLikedTooltips = ['Добавить в избранное', 'Убрать из избранного']


const isLikedIcons = [
    <FavoriteBorderIcon color='disabled' style={{cursor: 'pointer'}} />,
    <FavoriteIcon color='secondary' style={{cursor: 'pointer'}} />
]


export default function AllAudiosTableView(props) {
    const classes = useStyles();
    const [title, setTitle] = React.useState(undefined);
    const [rows, setRows] = React.useState(props.data.audios)
    React.useEffect(() => {setRows(props.data.audios)}, [props.data.audios])

    const audiosCount = props.data.count
    const currentPage = props.data.currentPage
    const rowsPerPage = 15
    const { onPageChange, onOrderChange, onTitleChange, onLike, order, orderBy } = props

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        onOrderChange(isAsc ? 'desc' : 'asc', property);
    };

    const handleChangeFilter = (event) => {
        setTitle(event.target.value)
    };


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length );

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <FilterToolbar handleChange={handleChangeFilter}
                                   onClick={ () => onTitleChange(title) }
                                   placeholder='введи название звука для поиска'
                    />
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='small'
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headCells={headCells}
                        />
                        <TableBody>
                            {rows.map((row, index) => {
                                return (
                                    <TableRow hover key={index}>

                                        { likeIcon(row.is_liked, row.audioId, onLike, rows, setRows) }

                                        <TableCell align="left" >
                                            <Link component={RouterLink} to={`/audio/${row.audioId}`} underline='none'>
                                                <Avatar src={row.coverUrl} alt={row.title} style={{width: 30, height: 30}} />
                                            </Link>
                                        </TableCell>

                                        <TableCell align="left" >
                                            <Link component={RouterLink} to={`/audio/${row.audioId}`} underline='none' style={{color: 'black'}}>
                                                {row.artist}
                                            </Link>
                                        </TableCell>

                                        <TableCell align="left" >
                                            <Link component={RouterLink} to={`/audio/${row.audioId}`} underline='none' style={{color: 'black'}}>
                                                {row.title}
                                            </Link>
                                        </TableCell>

                                        { isOriginalIcons[row.original] }

                                        { playButton(row.playUrl) }

                                        <TableCell align="right" >{ row.duration }</TableCell>

                                        <TableCell align="right">{spacedNumber(row.videos_count)}</TableCell>

                                        <TableCell align="right">{dateStrFromParam(row.add_date)}</TableCell>

                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 33 * emptyRows }}>
                                    <TableCell colSpan={headCells.length} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination rowsPerPageOptions={[]}
                                 component="div"
                                 count={audiosCount}
                                 page={currentPage}
                                 rowsPerPage={rowsPerPage}
                                 onChangePage={onPageChange}/>
            </Paper>
        </div>
    );
}
