class ApplicationController < ActionController::API
  private

  def current_user
    return @current_user if defined?(@current_user)

    authorization_header = request.headers[:authorization]
    return @current_user = nil if authorization_header.blank?

    token = authorization_header.split(' ')[1]
    secret_key = Rails.application.secret_key_base
    decoded_token = JWT.decode(token, secret_key)
    user_id = decoded_token[0]['user_id']
    @current_user = User.find_by(id: user_id)

  rescue JWT::DecodeError
    @current_user = nil
  end

  def authenticate_user!
    head :unauthorized if current_user.nil?
  end
end
