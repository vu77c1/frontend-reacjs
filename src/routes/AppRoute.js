import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home/Home'
import TableUSers from '../components/admin/User/TableUsers'
import Login from '../components/admin/Login'
import PrivateRoute from './PrivateRoute'
import NotFound from './NotFound'
import Supplier from '../components/admin/book/Supplier'
import ListBook from '../components/admin/book/ListBook'
import Category from '../components/admin/book/Category'
import BookImport from '../components/admin/book/BookImport'

export default function AppRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={
                    <PrivateRoute >
                        <TableUSers />
                    </PrivateRoute >
                } />
                <Route path="/book/supplier" element={
                    <PrivateRoute >
                        <Supplier />
                    </PrivateRoute >
                } />
                <Route path="/book/listbook" element={
                    <PrivateRoute >
                        <ListBook />
                    </PrivateRoute >
                } />
                <Route path="/book/bookimport" element={
                    <PrivateRoute >
                        <BookImport />
                    </PrivateRoute >
                } />
                <Route path="/book/category" element={
                    <PrivateRoute >
                        <Category />
                    </PrivateRoute >
                } />
                <Route path='*' element={<NotFound />}>

                </Route>
            </Routes>

        </>
    )
}
