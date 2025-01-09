export type teams = {
	blue_nums: number[],
	red_nums: number[]
};

export type state = {
	"auto_leave": boolean,
	"auto_speaker": number,
	"auto_amp": number,

	"passing": boolean,
	"teleop_speaker": number,
	"teleop_amp": number,

	"park": boolean,
	"onstage": boolean,
	"harmony": boolean,
	"spotlit": boolean,
	"trap": number,
}
