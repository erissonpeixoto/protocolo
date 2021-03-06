class Api::V1::ProfilesController < Api::V1::ApiController
  before_action :set_profile, only: [:show, :update, :destroy]
  #before_action :require_authorization!, only: [:show, :update, :destroy]

  # GET /api/v1/profiles
  def index
    @profiles = Profile.all
    render json: @profiles
  end

  # GET /api/v1/profiles/1
  def show
    render json: @profile
  end

  # POST /api/v1/profiles
  def create
    @profile = Profile.new(profile_params)
    if @profile.save
      render json: @profile, status: :created
    else
      render json: @profile.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/profiles/1
  def update
    if @profile.update(profile_params)
      render json: @profile
    else
      render json: @profile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/profiles/1
  def destroy
    @profile.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.

    def set_profile
      @profile = Profile.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def profile_params
      params.require(:profile).permit(:name, :code)
    end

    def require_authorization!
      unless current_user == @profile.try(:user)
        render json: {}, status: :forbidden
      end
    end
end
