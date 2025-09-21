class ApiResponse {
	public statusCode: number;
	public success: boolean;
	public message: string;
	public data: any;
	public errors: any;

	constructor(statusCode: number, message: string, data?: any, errors?: any) {
		this.statusCode = statusCode;
		this.success = statusCode < 400;
		this.message = message;
		if (this.success) {
			this.data = data;
		}

		if (!this.success) {
			this.errors = errors;
		}
	}
}

export default ApiResponse;
