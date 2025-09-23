class ApiError {
	public message: string;
	public statusCode: number;
	public errors: any;
	constructor(message: string, statusCode: number, errors?: any) {
		this.message = message;
		this.statusCode = statusCode;
		this.errors = errors;
	}
}

export default ApiError;
