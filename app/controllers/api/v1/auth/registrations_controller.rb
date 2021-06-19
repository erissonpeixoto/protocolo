module Api::V1::Auth
  class RegistrationsController < DeviseTokenAuth::RegistrationsController
    skip_before_action :verify_authenticity_token
    wrap_parameters :user, include: [:name, :email, :profile_id, :password, :password_confirmation]

    private

    def sign_up_params
      params.require(:user).permit(:name, :email, :profile_id, :password, :password_confirmation)
    end

    def account_update_params
      params.require(:user).permit(:name, :profile_id, :password, :password_confirmation)
    end
  end
end