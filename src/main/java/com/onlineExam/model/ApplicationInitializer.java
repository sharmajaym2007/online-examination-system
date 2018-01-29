package com.onlineExam.model;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import com.onlineExam.config.MainConfiguration;

public class ApplicationInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

	@Override
    protected Class<?>[] getRootConfigClasses() {
		return new Class[] {};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[]{ MainConfiguration.class };
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{ "/" };
    }
}
