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

    payload = { user_id: 1 }
    secret_key = Rails.application.secret_key_base
    token = JWT.encode(payload, secret_key)

    render json: { token: }
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
