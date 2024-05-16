class HomesController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: { message: current_user }
  end
end
