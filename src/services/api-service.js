
function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

export function datetimeStrFromParam(param) {
    if (param) {
        return new Date(param).toLocaleString()
    } else {
        return '—'
    }
}

export function dateStrFromParam(param) {
    if (param) {
        return new Date(param).toLocaleDateString()
    } else {
        return '—'
    }
}

export function spacedNumber(x) {
    if (typeof x === 'number') {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    } else {
        return x
    }
}

function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}

function getCurrentPageNumber(next, prev) {
    if (prev === null) {
        return 0
    } else {
        if (next !== null) {
            const offset = parseInt(next.split('?')[1].split('&')[1].split('=')[1])
            return (offset - 15) / 15
        } else {
            const offset = parseInt(prev.split('?')[1].split('&')[1].split('=')[1])
            return offset / 15 + 1
        }
    }
}

function convertMethodName(method) {
    if (method === 'getAllAudios') {
        return 'audios.getAll'
    } else if (method === 'getFavouriteAudios') {
        return 'audios.getLiked'
    } else if (method === 'getAddedAudios') {
        return 'audios.getOwned'
    } else if (method === 'getAbsoluteChart') {
        return 'audios.getAbsoluteChart'
    } else if (method === 'getPercentChart') {
        return 'audios.getPercentChart'
    }
}


export default class ApiService {
    // _apiBaseUrl = 'http://77.223.106.195:70/api/'
    _apiBaseUrl = 'http://127.0.0.1:8000/api/'

    async _getResponse(method, params) {
        const fullUrl = new URL(`${this._apiBaseUrl}${method}`)
        fullUrl.search = new URLSearchParams(params).toString()
        const response = await fetch(fullUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {Authorization: `JWT ${localStorage.getItem('token')}`},
        })
        if (response.ok) {
            return await response.json()
        }
    }

    async getUser() {
        const user = await this._getResponse('users.get')
        if (typeof user !== 'undefined') {
            return this._unpackUser(user)
        }
    }

    async getAllAudios(method, limit, offset, order, orderBy, title) {
        let params = {limit: limit, offset: offset}
        if (typeof order !== 'undefined' && typeof orderBy !== 'undefined') {
            params.order = order
            params.order_by = orderBy
        }
        if (typeof title !== 'undefined') {
            params.title = title
        }
        const audios = await this._getResponse(convertMethodName(method), params)
        if (typeof audios !== 'undefined') {
            return this._unpackAudios(audios)
        }
    }

    async getAudioStats(audioId) {
        const data = await this._getResponse('audios.get', {audio_id: audioId})
        if (typeof data !== 'undefined') {
            return this._unpackAudioStats(data)
        }
    }

    async getChart(method, limit, offset) {
        const data = await this._getResponse(convertMethodName(method), {limit: limit, offset: offset})
        if (typeof data !== 'undefined') {
            return this._unpackChart(data, offset)
        }
    }

    async addAudio(url) {
        const data = await this._getResponse('audios.add', {tiktok_url: url})
        return typeof data !== 'undefined';
    }

    async parsTrends() {
        const data = await this._getResponse('audios.parsTrends', {count: 2000})
        return typeof data !== 'undefined';
    }

    async updateStats() {
        const data = await this._getResponse('audios.updateStats', )
        return typeof data !== 'undefined';
    }

    async like(audioId) {
        await this._getResponse('audios.like', {audio_id: audioId})
    }

    async login(username, password) {
        const response = await fetch(`${this._apiBaseUrl}users.auth`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type'
            },
            body: JSON.stringify({username: username, password: password})
        })
        if (response.ok) {
            return await response.json()
        }
    }


    _unpackUser = (user) => {
        return {
            username: user.username,
            balance: roundToTwo(user.balance),
            isAdmin: user.is_admin,
            haveAccess: user.have_access
        }
    }

    _unpackAudios = (data) => {
        return {
            count: data.count,
            next: data.next,
            prev: data.previous,
            currentPage: getCurrentPageNumber(data.next, data.previous),
            audios: data.results.map((audio) => {
                return {
                    audioId: audio.audio_id,
                    artist: audio.artist,
                    title: audio.title,
                    videos_count: audio.videos_count,
                    duration: fmtMSS(audio.duration),
                    original: audio.original ? 1 : 0,
                    playUrl: audio.play_url,
                    coverUrl: audio.cover_small_url,
                    add_date: audio.add_date,
                    is_liked: audio.is_liked ? 1 : 0
                }
            })
        }
    }

    _unpackAudioStats = (data) => {
        console.log(data)
        const stats = data.stats.reverse()
        return {
            audioId: data.audio_id,
            artist: data.artist,
            title: data.title,
            videos_count: data.videos_count,
            duration: fmtMSS(data.duration),
            original: data.original ? 1 : 0,
            playUrl: data.play_url,
            coverUrl: data.cover_medium_url,
            stats: stats.map((stat) => {
                return {
                    videos_count: stat.videos_count,
                    date: dateStrFromParam(stat.date),
                    count_delta: stat.count_delta,
                    count_delta_percent: stat.count_delta_percent
                }
            })
        }
    }

    _unpackChart = (data, offset) => {
        const realOffset = offset ? offset : 0
        return {
            count: data.count,
            next: data.next,
            prev: data.previous,
            currentPage: getCurrentPageNumber(data.next, data.previous),
            audios: data.results.map((item, idx) => {
                return {
                    position: realOffset + idx + 1,
                    audioId: item.audio.audio_id,
                    artist: item.audio.artist,
                    title: item.audio.title,
                    videos_count: item.videos_count,
                    duration: fmtMSS(item.audio.duration),
                    original: item.audio.original ? 1 : 0,
                    playUrl: item.audio.play_url,
                    coverUrl: item.audio.cover_small_url,
                    add_date: item.audio.add_date,
                    count_delta: item.count_delta,
                    count_delta_percent: roundToTwo(item.count_delta_percent * 100)
                }
            })
        }
    }

}