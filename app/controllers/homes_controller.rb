class HomesController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: { message: 'You are the authenticated user!' }
  end
end
