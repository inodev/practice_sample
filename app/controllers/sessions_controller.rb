class SessionsController < ApplicationController
  def create
    user = User.authenticate_by(user_params)

    if user.present?
      payload = { user_id: user.id }
      secret_key = Rails.application.secret_key_base
      token = JWT.encode(payload, secret_key)
      render json: { token: }, status: :ok
    else
      head :not_found
    end
  end

  private

  def user_params
    params.permit(:email, :password)
  end
end
