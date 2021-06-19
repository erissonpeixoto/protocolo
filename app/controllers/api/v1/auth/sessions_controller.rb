module Api::V1::Auth
  class SessionsController < ::DeviseTokenAuth::SessionsController
    # Prevent session parameter from being passed
    # Unpermitted parameter: session
    skip_before_action :verify_authenticity_token
    before_action :configure_permitted_parameters, if: :devise_controller?
    wrap_parameters format: []

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
    end

  end
end