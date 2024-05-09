class UsersController < ApplicationController
  def create
    # user = User.new(user_params)

    # if user.save
    #   render json: user, status: :created
    # else
    #   render json: user.errors, status: :unprocessable_entity
    # end

    body = request.body.read
    parsed_body = JSON.parse(body)

    render json: { message: parsed_body['email'] }
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
