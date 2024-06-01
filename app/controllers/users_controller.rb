class UsersController < ApplicationController
  def create
    user = User.new(user_params)

    if user.save
      payload = { user_id: user.id }
      secret_key = Rails.application.secret_key_base
      token = JWT.encode(payload, secret_key)
      render json: { token: }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:email, :password)
  end
end
