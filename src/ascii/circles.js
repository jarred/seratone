/**
@author ertdfgcvb
@title  Circle
@desc   Draw a smooth circle with exp()
*/

import { sdCircle } from '$lib/play.core/src/modules/sdf'
import { sort } from '$lib/play.core/src/modules/sort'
import { main as bgMain } from '../ascii/bg'

const density = sort('/\\|=— ', 'Simple Console', false)

export const settings = { fps : 25 }

export function main(coord, context, cursor, buffer) {
	const t  = context.time * 0.002
    const m = Math.min(context.cols, context.rows)
    const a = context.metrics.aspect

	const st = {
		x : 1.5 * (coord.x - context.cols / 2) / m * a,
		y : 1.5 * (coord.y - context.rows / 2) / m
	}

  let radius = window.mix/1
	const d = sdCircle(st, radius)
	const c = 1.0 - Math.exp(-20 * Math.abs(d))
	const index = Math.floor(c * density.length)

	let char = density[index];
	if (char !== ' ' && window.state === "playing") {
		return char;
	}

	return bgMain(coord, context, cursor, buffer);
}
