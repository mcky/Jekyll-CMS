export default function keyMirror(keys) {
	keys = Array.isArray(keys) ? keys : Object.keys(keys)
	var mirror = {}
	keys.forEach(v => mirror[v] = v)
	return mirror
}
