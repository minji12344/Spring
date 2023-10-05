package class01;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    @Override
    public void init() {
    	// 초기화 작업 수행
    }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		if(isVaildUser(username, password)) {
			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().println("SC_OK");
		} 
		else {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.getWriter().println("SC_UNAUTHORIZED");
		}
	}
	
	private boolean isVaildUser(String username, String password) {
		return username.equals("admin") && password.equals("admin123");
	}
	
	@Override
	public void destroy() {
		//종료 시점 작업
	}
}