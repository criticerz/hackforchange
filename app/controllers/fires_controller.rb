class FiresController < ApplicationController

  def index

    data = Zip.get_data

    render json: data

  end

  def show_map

  end

end
